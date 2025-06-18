package com.example;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class HelloTest {

    @Test
    void testSum() {
        int result = 2 + 2;
        assertEquals(4, result, "2 + 2 phải bằng 4");
    }
}
