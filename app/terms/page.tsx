import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, Book, FileText, DollarSign, Users, Shield, Gavel, Bell, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: `Terms of Service - ${SITE_CONFIG.name}`,
  description: 'Terms of Service and usage guidelines',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Scale className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <p>Effective Date: December 15, 2024</p>
            <span>•</span>
            <p>Last Updated: December 15, 2024</p>
          </div>
        </div>


        <div className="prose dark:prose-invert max-w-none space-y-8">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Welcome to Qurankareem.app. By accessing or using our website, you agree to the following terms and conditions. If you do not agree, please refrain from using the site.
          </p>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Book className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">1. Use of the Website</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Our website is dedicated to providing access to the Quran for everyone, regardless of age.</li>
                    <li>• You agree to use the site only for lawful purposes and in compliance with these terms.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <FileText className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">2. Intellectual Property</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• All content on this site, including text, images, code, and designs, is owned by &quot;Qurankareem.app&quot; or its licensors.</li>
                    <li>• Unauthorized use, reproduction, or distribution of content is prohibited.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <DollarSign className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">3. Advertisements and Donations</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <h3 className="text-base font-medium text-foreground mb-2">Advertisements:</h3>
                      <p>The website may display third-party advertisements to support our services. By using the site, you agree to the presence of ads. We are not responsible for the content or accuracy of third-party advertisements.</p>
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-foreground mb-2">Donations:</h3>
                      <p>Users have the option to support the site by making voluntary donations. Donations are non-refundable. Your contributions help us maintain and improve the website and its offerings.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Users className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">4. User-Generated Content</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Users may submit content, such as feedback or suggestions, which remain their property.</li>
                    <li>• By submitting content, you grant us a non-exclusive, royalty-free license to use, modify, and display it.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">5. Limitations of Liability</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Qurankareem.app is provided &quot;as is&quot; without any warranties, expressed or implied.</li>
                    <li>• We are not responsible for any loss, damage, or disruption caused by the use or inability to use the site.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Gavel className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">6. Governing Law</h2>
                  <p className="text-muted-foreground">
                    These terms are governed by the laws of Sweden. Any disputes will be resolved in the courts of Sweden.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Bell className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">7. Changes to These Terms</h2>
                  <p className="text-muted-foreground">
                    We may update these Terms and Conditions periodically. Continued use of the site constitutes acceptance of any changes.
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
                  <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
                  <p className="text-muted-foreground mb-2">For questions or concerns about these terms, contact us at:</p>
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

      {/* API Attributions Card */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Book className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-3">API Attributions</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground">Quran Data</h3>
                  <p>Quran text and translations provided by <a href="https://quran.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Quran.com</a></p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground">Audio Recitations</h3>
                  <p>Audio recitations provided by <a href="https://everyayah.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">EveryAyah.com</a></p>
                </div>

                <div className="text-sm pt-4 border-t">
                  <p>We are grateful to these services for providing access to their APIs and data. Please visit their respective websites to learn more about their work.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}