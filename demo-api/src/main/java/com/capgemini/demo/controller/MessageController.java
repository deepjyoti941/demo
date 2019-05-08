package com.capgemini.demo.controller;

import com.capgemini.demo.model.Message;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Rest Controller
 *
 * @author Biplab Nayak
 */
@RestController
@RequestMapping("/message")
public class MessageController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MessageController.class);

    @Autowired
    RedisTemplate<String, String> redisTemplate;

    private final String key = "testKey";


    @PostMapping(produces = "application/json", consumes = "application/json")
    public Map<String, String> save(@RequestBody Message message) throws JsonProcessingException {

        LOGGER.debug("Putting Message to REDIS : {}", message.getMessage());
        redisTemplate.opsForValue().set(key, toJson(message));

        Map<String, String> map = new HashMap<>();
        map.put("status", "SUCCESS");
        return map;
    }

    @GetMapping(produces = "application/json")
    public Message get() throws IOException {

        LOGGER.debug("Getting message from redis ..");
        return toObject(redisTemplate.opsForValue().get(key));
    }

    private String toJson(Message message) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(message);
    }

    private Message toObject(String json) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(json, Message.class);
    }
}