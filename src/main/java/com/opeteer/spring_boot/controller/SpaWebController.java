package com.opeteer.spring_boot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaWebController {

    @GetMapping(value = {
            "/login",
            "/dashboard",
            "/pengumuman",
            "/jadwal",
            "/tagihan",
            "/biodata",
            "/krs",
            "/ktm-khs"
    })
    public String forwardSpaRoutes() {
        return "forward:/index.html";
    }
}
