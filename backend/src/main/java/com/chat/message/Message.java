package com.chat.message;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Message {
    @Id
    @GeneratedValue
    private Long id;

    private String author;
    private String text;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date publishedOn) {
        this.created = publishedOn;
    }

    public Message(Long id, String author, String text, Date created) {
        super();
        this.id = id;
        this.author = author;
        this.text = text;
        this.created = created;
    }

    public Message() {

    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
