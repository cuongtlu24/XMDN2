import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const legalPoints = [
  "Sổ hồng riêng",
  "Công chứng sang tên ngay",
  "Hỗ trợ ngân hàng",
]

export function LegalSection() {
  return (
    <section id="legal" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            PHÁP LÝ ĐẦY ĐỦ
          </h2>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {legalPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-3 bg-primary-foreground/10 px-6 py-3 rounded-full">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-secondary-foreground" />
                </div>
                <span className="font-medium">{point}</span>
              </div>
            ))}
          </div>

          <Button 
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-10"
          >
            NHẬN BÁO GIÁ
          </Button>
        </div>
      </div>
    </section>
  )
}
