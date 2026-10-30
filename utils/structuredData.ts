/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';

export interface FaqSchemaEntry {
  question: string;
  answer: string;
}

/**
 * Emits FAQPage structured data from the exact questions and answers rendered
 * on the page. Generating the schema from the visible content means it can no
 * longer drift out of sync — Google requires structured data to describe
 * content the visitor can actually see.
 */
export function useFaqSchema(faqs: FaqSchemaEntry[]) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.wavesSchema = 'faq-page';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    });

    document.head.appendChild(script);
    return () => script.remove();
  }, [faqs]);
}
