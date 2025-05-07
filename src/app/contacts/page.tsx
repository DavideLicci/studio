'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TranslatedText } from '@/components/shared/translated-text';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import type { FormEvent } from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function ContactsPage() {
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Basic form handling example
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    console.log({ name, email, message }); // In a real app, send this data to a server

    toast({
      title: t('contacts_message_sent_title') || "Message Sent!",
      description: t('contacts_message_sent_desc') || "Thank you for your message. We'll be in touch soon.",
      variant: "default", 
    });
    event.currentTarget.reset(); // Reset form after submission
  };
    

  return (
    <div className="max-w-2xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <Card className="shadow-xl animate-fade-in-slow">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl md:text-5xl font-bold">
            <TranslatedText translationKey="contacts_title" />
          </CardTitle>
          <CardDescription className="text-lg md:text-xl text-muted-foreground pt-2">
            <TranslatedText translationKey="contacts_intro" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 animate-slide-in-bottom-slow" style={{animationDelay: '0.1s'}}>
              <Label htmlFor="name">
                <TranslatedText translationKey="contacts_name_label" />
              </Label>
              <Input id="name" name="name" type="text" required className="bg-background" />
            </div>
            <div className="space-y-2 animate-slide-in-bottom-slow" style={{animationDelay: '0.2s'}}>
              <Label htmlFor="email">
                <TranslatedText translationKey="contacts_email_label" />
              </Label>
              <Input id="email" name="email" type="email" required className="bg-background" />
            </div>
            <div className="space-y-2 animate-slide-in-bottom-slow" style={{animationDelay: '0.3s'}}>
              <Label htmlFor="message">
                <TranslatedText translationKey="contacts_message_label" />
              </Label>
              <Textarea id="message" name="message" rows={5} required className="bg-background" />
            </div>
            <Button type="submit" className="w-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 animate-slide-in-bottom-slow" style={{animationDelay: '0.4s'}}>
              <Send className="mr-2 h-4 w-4" />
              <TranslatedText translationKey="contacts_send_button" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
