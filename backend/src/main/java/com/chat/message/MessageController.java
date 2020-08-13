package com.chat.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @GetMapping("/messages")
    public List<Message> getMessages(
            @RequestParam(value = "cutoffId", required = false) Long cutoffId,
            @RequestParam(value = "limit", required = false, defaultValue = "30") Integer limit
    ) {
        return (cutoffId != null ?
                messageRepository.findByIdGreaterThan(cutoffId)
                : messageRepository.findAll()
        ).stream().limit(limit).collect(Collectors.toList());
    }

    @PostMapping("/messages")
    public ResponseEntity<Void> createMessage(@RequestBody Message message) {
        messageRepository.save(message);
        return ResponseEntity.ok().build();
    }

}