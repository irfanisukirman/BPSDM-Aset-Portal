"use client";

import { useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ExternalLink, Link as LinkIcon, Search } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type LinkItem = {
  title: string;
  description: string;
  url: string;
};

type Category = {
  name: string;
  icon: LucideIcon;
  links: LinkItem[];
};

const data: Category[] = [
  {
    name: 'Informasi Tautan',
    icon: LinkIcon,
    links: [
      {
        title: 'SiJagung BPSDM Provinsi Jawa Barat',
        description: 'SiJagung adalah Sistem Digital Penjadwalan Pemeliharaan Rutin Gedung.',
        url: 'https://docs.google.com/spreadsheets/d/1mTaTsCgm0ZsHsnfUGBvesglX8JKMryqGN5ObJq5qDZk/edit?hl=id&gid=0#gid=0',
      },
      {
        title: 'Panduan Penggunaan SiJagung',
        description: 'Dokumentasi dan panduan langkah demi langkah untuk menggunakan SiJagung.',
        url: 'https://s.id/how_to_sijagung',
      },
      {
        title: 'Laporan Denah BPSDM Provinsi Jawa Barat',
        description: 'Denah dan tata letak fasilitas di lingkungan BPSDM Provinsi Jawa Barat.',
        url: 'https://docs.google.com/spreadsheets/d/1Gs4zNJih6NW2OqZP8XTVH8nDnCZjxKx3KtfqFP-RS6I/edit?gid=1723776320#gid=1723776320',
      },
    ],
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return data;
    }

    const lowercasedFilter = searchTerm.toLowerCase();

    return data
      .map((category) => {
        const filteredLinks = category.links.filter(
          (link) =>
            link.title.toLowerCase().includes(lowercasedFilter) ||
            link.description.toLowerCase().includes(lowercasedFilter)
        );

        if (filteredLinks.length > 0) {
          return { ...category, links: filteredLinks };
        }
        return null;
      })
      .filter((category): category is Category => category !== null);
  }, [searchTerm]);

  const defaultAccordionValues = useMemo(() => {
    return filteredData.map((category) => category.name);
  }, [filteredData]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
            Pusat Sumber Daya
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Tim Aset BPSDM Provinsi Jawa Barat
          </p>
        </header>

        <div className="mx-auto mb-12 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari sumber daya..."
              className="w-full rounded-full py-6 pl-12 text-base shadow-sm focus:ring-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mx-auto max-w-5xl">
          {filteredData.length > 0 ? (
            <Accordion
              type="multiple"
              defaultValue={defaultAccordionValues}
              className="w-full space-y-4"
            >
              {filteredData.map((category) => (
                <AccordionItem
                  key={category.name}
                  value={category.name}
                  className="rounded-lg border-none bg-muted shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline [&[data-state=open]>svg]:text-accent">
                    <div className="flex items-center gap-3">
                      <category.icon className="h-6 w-6 text-primary" />
                      {category.name}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-5 px-6 pb-2 pt-1 md:grid-cols-2 lg:grid-cols-3">
                      {category.links.map((link) => (
                        <a
                          key={link.title}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block"
                        >
                          <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-accent hover:shadow-lg bg-card">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                              <CardTitle className="pr-4 text-base font-medium text-black">
                                {link.title}
                              </CardTitle>
                              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-500">
                                {link.description}
                              </p>
                            </CardContent>
                          </Card>
                        </a>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">
                Tidak ada hasil yang ditemukan untuk "{searchTerm}".
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t py-6 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Tim Aset BPSDM Provinsi Jawa
          Barat. All rights reserved.
        </p>
      </footer>
    </div>
  );
}