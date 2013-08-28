package ar.com.jmfsg.documentation.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Documented {
	String description();
	String longDescription() default "";
	String group();
	String subgroup() default "";
	String friendlyName() default "";
	String[] parameterNames() default {};
}
