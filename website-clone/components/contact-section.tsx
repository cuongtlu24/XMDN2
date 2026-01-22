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
              Đầu tư <span className="text-secondary">ĐẮT GIÁ</span>
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              Đầu tư <span className="text-secondary">AN NHIÊN</span>
            </h3>

            <div className="space-y-4 text-background/80 text-sm leading-relaxed">
              <p>
                Xin chân thành cám ơn Quý khách đã quan tâm đến dự án. Để biết thêm thông tin 
                chi tiết, Quý khách vui lòng liên hệ trực tiếp với chúng tôi, hoặc để lại thông 
                tin theo mẫu bên dưới. Chúng tôi sẽ hồi âm trong thời gian sớm nhất.
              </p>
              <p className="text-xs text-background/60">
                Chúng tôi đặc biệt cẩn trọng trong việc chuẩn bị các nội dung trên website này. 
                Mọi thông tin/hình ảnh/bản vẽ chỉ thể hiện thông số kỹ thuật, tính thẩm mỹ và 
                sự sáng tạo tại thời điểm được đăng tải, đồng thời mang tính chất tham khảo và 
                không đại diện chính xác cho điều kiện xây dựng thực tế, cũng như không mang 
                tính đại diện hay là một phần của hợp đồng.
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-background/10 backdrop-blur-sm border border-background/20 rounded-lg p-8">
            <h3 className="text-xl font-bold mb-2">ĐĂNG KÝ</h3>
            <h4 className="text-lg font-semibold text-secondary mb-6">NHẬN THÔNG TIN</h4>

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
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background/10 border-background/30 text-background placeholder:text-background/50"
                />
                <Input
                  type="tel"
                  placeholder="Số điện thoại"
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
                  GỬI
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
