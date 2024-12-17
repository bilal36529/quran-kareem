import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { Shield, Lock, UserCircle, Database, Bell, Scale, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: `Privacy Policy - ${SITE_CONFIG.name}`,
  description: 'Privacy Policy and data handling practices',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <p>Effective Date: December 11, 2024</p>
            <span>•</span>
            <p>Last Updated: December 11, 2024</p>
          </div>
        </div>
        
        <div className="prose dark:prose-invert max-w-none space-y-8">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website (MyQuran).
          </p>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <UserCircle className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Personal Information: We may collect personal information, such as your name and email address, when you interact with certain features of the site.</li>
                    <li>• Usage Data: We collect non-personal data such as IP address, browser type, pages visited, and time spent on the site to improve user experience.</li>
                    <li>• Cookies: We use cookies to enhance functionality and analyze website performance. You can control cookies through your browser settings.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Database className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-3">We use the information collected to:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Provide and maintain our services</li>
                    <li>• Personalize your experience on the site</li>
                    <li>• Analyze site usage to improve features and content</li>
                    <li>• Communicate updates or respond to inquiries</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Lock className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
                  <p className="text-muted-foreground">
                    We use industry-standard security measures to protect your data. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Scale className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">4. Your Rights</h2>
                  <p className="text-muted-foreground mb-3">You have the right to:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Access and update your personal data</li>
                    <li>• Request deletion of your data</li>
                    <li>• Opt-out of certain data collection practices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Bell className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">5. Changes to This Privacy Policy</h2>
                  <p className="text-muted-foreground">
                    We may update this Privacy Policy periodically. Changes will be posted on this page with the updated effective date.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">6. Contact Us</h2>
                  <p className="text-muted-foreground mb-2">For questions or concerns about this Privacy Policy, contact us at:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Name: Abdirahman Ahmed</li>
                    <li>Email: gobmedia2@gmail.com</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}