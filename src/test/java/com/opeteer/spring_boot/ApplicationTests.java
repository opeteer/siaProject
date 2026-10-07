package com.opeteer.spring_boot;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class ApplicationTests {

	@Value("${server.port:8020}")
	private int serverPort;

	@Test
	void contextLoads() {
	}

	@Test
	void testDefaultServerPortIs8020() {
		assertEquals(8020, serverPort, "Default server port should be 8020");
	}

}

