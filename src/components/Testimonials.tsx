
import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  company: string;
  delay: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, company, delay }) => {
  return (
    <div 
      className="glass-card p-6 animate-fade-in" 
      style={{ animationDelay: `${delay}s` }}
    >
      <Quote className="text-formaflow-purple-light w-10 h-10 mb-4 opacity-80" />
      <p className="text-lg mb-6">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-formaflow-muted-text text-sm">{company}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "This feels like having an in-house content strategist who understands our portfolio and our clients.",
      author: "Marta Ruiz",
      company: "Studio OCA"
    },
    {
      quote: "We've doubled our social media engagement without adding any extra work to our design process.",
      author: "Thomas Eriksen",
      company: "Nord Architecture"
    },
    {
      quote: "FormaFlow turns our BIM models and construction photos into a coherent narrative that clients love following.",
      author: "James Chen",
      company: "Atelier Design Group"
    }
  ];
  
  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <p className="text-formaflow-purple font-medium mb-2">TESTIMONIALS</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What Architecture Studios Say
        </h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            quote={testimonial.quote}
            author={testimonial.author}
            company={testimonial.company}
            delay={0.1 + index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
