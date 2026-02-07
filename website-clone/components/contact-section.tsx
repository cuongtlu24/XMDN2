"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Reset form
    setFormData({ name: "", phone: "", email: "" })
  }

  return (
    <section id="contact" className="py-20 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-secondary">VALUABLE</span> Investment
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              <span className="text-secondary">SECURE</span> Investment
            </h3>

            <div className="space-y-4 text-background/80 text-sm leading-relaxed">
              <p>
                Thank you for your interest in our project. For more detailed information, 
                please contact us directly or leave your information in the form below. 
                We will respond as soon as possible.
              </p>
              <p className="text-xs text-background/60">
                We are particularly careful in preparing the content on this website. 
                All information/images/drawings only represent technical specifications, aesthetics, 
                and creativity at the time of posting, and are for reference purposes only 
                and do not accurately represent actual construction conditions, nor are they 
                representative or part of the contract.
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-background/10 backdrop-blur-sm border border-background/20 rounded-lg p-8">
            <h3 className="text-xl font-bold mb-2">REGISTER</h3>
            <h4 className="text-lg font-semibold text-secondary mb-6">GET INFORMATION</h4>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-bold text-lg mb-2">Thank you!</h4>
                <p className="text-background/80 text-sm">
                  Your submission has been received! Keep an eye on your phone or email because we will contact you soon.
                </p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="mt-4 border-background/30 text-background hover:bg-background/10"
                >
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background/10 border-background/30 text-background placeholder:text-background/50"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-background/10 border-background/30 text-background placeholder:text-background/50"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/10 border-background/30 text-background placeholder:text-background/50"
                />
                <Button 
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold"
                >
                  SUBMIT
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
