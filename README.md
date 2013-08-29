Who doesn't love documentation?
===============================

In a project I was working on, I developed a nice couple of classes to automagically document our API for us, later I extracted it to an external component for other applications to use it, and now I'm putting it out here for the world.

It's nothing complicated, but it helps set a standard across different apps that publish an API in your organization.

Quick how to
------------

All you need to do, is

1) Add the dependency to the component in your web application

    <dependency>
        <groupId>ar.com.jmfsg</groupId>
        <artifactId>api-doc</artifactId>
        <version>0.0.27</version>
    </dependency>

2) Import the component context in your application context

    <import resource="classpath:ar/com/jmfsg/documentation/application-context.xml" />

3) Write your *doc file* -- see the [sample application](https://github.com/juanformoso/api-doc-sample) with an example.

4) Specify where to find the *doc file*

    <bean class="ar.com.jmfsg.documentation.DocumentationDescriptor" p:modulePrefix="misc" p:resource="classpath:doc" />

And that's it!  
When you run your application, you'll see your pretty documentation

###Method index
![](https://raw.github.com/juanformoso/api-doc/master/img/index.png)

###Method detail
![](https://raw.github.com/juanformoso/api-doc/master/img/detail.png)

Stuff I know is wrong and plan on fixing
----------------------------------------

- The *sections* supported in the detailed view are kind of hardcoded (they are optional, but hardcoded) to what we used internally -- parameters, filters, options, and facets. I plan on making it generic so you can define your own sections somewhere in the doc file, and specify the field list for them. (this will probably break compatibility, but I don't expect it to be that difficult)

- The toggle is suboptimal code, there's a TODO in there.
