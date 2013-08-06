package ar.com.jmsfg.documentation.model;

import java.io.IOException;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import ar.com.jmfsg.documentation.model.Documentation;

import com.google.common.collect.ImmutableSet;

public class ModelTestCase {

	private ObjectMapper objectMapper;

	@Before
	public void setUp() {
		objectMapper = new ObjectMapper();
		objectMapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.setSerializationInclusion(Inclusion.NON_NULL);
	}
	
	@Test
	public void testParseGeneral() throws JsonProcessingException, IOException {
		JsonNode jsonNode = objectMapper.readTree(ModelTestCaseData.getGeneralData());
		Documentation documentation = objectMapper.readValue(jsonNode, Documentation.class);
		Assert.assertNotNull(documentation);
		Assert.assertNotNull(documentation.general);
		Assert.assertEquals("Despegar API", documentation.general.projectName);
	}
	
	@Test
	public void testParseTags() throws JsonProcessingException, IOException {
		JsonNode jsonNode = objectMapper.readTree(ModelTestCaseData.getTagsData());
		Documentation documentation = objectMapper.readValue(jsonNode, Documentation.class);
		Assert.assertNotNull(documentation);
		Assert.assertNotNull(documentation.tags);
		Assert.assertEquals(3, documentation.tags.size());
		Assert.assertEquals("Beta", documentation.tags.get(0).name);
	}
	
	@Test
	public void testParseMethods1() throws JsonProcessingException, IOException {
		JsonNode jsonNode = objectMapper.readTree(ModelTestCaseData.getMethodsData1());
		Documentation documentation = objectMapper.readValue(jsonNode, Documentation.class);
		Assert.assertNotNull(documentation);
		Assert.assertNotNull(documentation.methods);
		Assert.assertEquals(1, documentation.methods.size());
		Assert.assertEquals(1, documentation.methods.get(0).size());
		Assert.assertEquals(ImmutableSet.of("methodName"), documentation.methods.get(0).keySet());
		Assert.assertEquals("methodGroup", documentation.methods.get(0).get("methodName").group);
	}
	
	@Test
	public void testParseMethods2() throws JsonProcessingException, IOException {
		JsonNode jsonNode = objectMapper.readTree(ModelTestCaseData.getMethodsData2());
		Documentation documentation = objectMapper.readValue(jsonNode, Documentation.class);
		Assert.assertNotNull(documentation);
		Assert.assertNotNull(documentation.methods);
		Assert.assertEquals(2, documentation.methods.size());
		Assert.assertEquals(2, documentation.methods.get(0).size());
		Assert.assertEquals(2, documentation.methods.get(1).size());
		Assert.assertEquals(ImmutableSet.of("methodName1_1","methodName1_2" ), documentation.methods.get(0).keySet());
		Assert.assertEquals(ImmutableSet.of("methodName2_1","methodName2_2" ), documentation.methods.get(1).keySet());
		Assert.assertEquals("methodGroup1", documentation.methods.get(0).get("methodName1_1").group);
	}

	
	@Test
	public void testParsePenaltyCalc() throws JsonProcessingException, IOException {
		JsonNode jsonNode = objectMapper.readTree(ModelTestCaseData.getPenaltyCalc());
		Documentation documentation = objectMapper.readValue(jsonNode, Documentation.class);
		Assert.assertNotNull(documentation);
		Assert.assertNotNull(documentation.methods);
		Assert.assertEquals(1, documentation.methods.size());
		Assert.assertEquals(2, documentation.methods.get(0).size());
		Assert.assertEquals(ImmutableSet.of("flightCancellationPenalty", "flightCancellationPenalty2" ), documentation.methods.get(0).keySet());
		Assert.assertEquals("Penalty Calc", documentation.methods.get(0).get("flightCancellationPenalty").group);
		Assert.assertEquals(7, documentation.methods.get(0).get("flightCancellationPenalty").request.parameters.size());
		Assert.assertEquals(2, documentation.methods.get(0).get("flightCancellationPenalty2").method.size());
	}	
}
