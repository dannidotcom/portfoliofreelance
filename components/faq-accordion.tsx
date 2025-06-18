"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-left">L'IA est-elle adaptée à mon entreprise ?</AccordionTrigger>
        <AccordionContent>
          Oui, quelle que soit votre taille, il existe des solutions IA accessibles et personnalisables. L'IA peut être
          appliquée à de nombreux domaines : service client, marketing, RH, production, etc. Un audit initial permettra
          d'identifier les opportunités spécifiques à votre activité.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger className="text-left">Combien de temps pour voir des résultats ?</AccordionTrigger>
        <AccordionContent>
          Dès les premières semaines grâce à une approche itérative et orientée action. Nous commençons par des quick
          wins pour démontrer rapidement la valeur ajoutée, puis nous déployons progressivement des solutions plus
          complexes.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger className="text-left">Alphonse.ai, c'est quoi ?</AccordionTrigger>
        <AccordionContent>
          Alphonse.ai est une plateforme d'IA no-code qui permet d'automatiser vos tâches et de créer des assistants
          intelligents sans compétences techniques. Elle s'intègre facilement à vos outils existants et peut être
          personnalisée selon vos besoins spécifiques.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger className="text-left">Quel investissement prévoir pour un projet IA ?</AccordionTrigger>
        <AccordionContent>
          L'investissement dépend de l'ampleur du projet et de vos objectifs. Nous proposons différentes formules
          adaptées à tous les budgets, avec une approche progressive qui permet de maîtriser les coûts. Un premier
          projet pilote peut démarrer à partir de quelques milliers d'euros.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger className="text-left">Faut-il des compétences techniques dans mon équipe ?</AccordionTrigger>
        <AccordionContent>
          Non, c'est justement l'avantage des solutions que je propose. Elles sont conçues pour être utilisées par des
          non-techniciens. Je m'occupe de la mise en place technique et je forme vos équipes à l'utilisation quotidienne
          des outils.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
