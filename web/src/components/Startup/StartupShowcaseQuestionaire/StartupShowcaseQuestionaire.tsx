import ReactMarkdown from 'react-markdown'

import Spoiler from 'src/components/Spoiler'

import type { StartupShowcaseQuery } from 'types/graphql'

export type StartupShowcaseQuestionaireProps = Pick<
  StartupShowcaseQuery['startup'],
  'questionResponses'
>

const StartupShowcaseQuestionaire = ({
  questionResponses,
}: StartupShowcaseQuestionaireProps) => {
  //
  if (questionResponses.length === 0) return null

  // --

  return (
    <section className="space-y-6">
      <header className="pb-2.5 mb-4 border-b border-stone-300">
        <h2 className="text-3xl font-bold">Interview</h2>
      </header>
      {questionResponses.map((qr, idx) => (
        <Spoiler open={idx === 0} key={idx} title={qr.question}>
          <ReactMarkdown className="startup-markdown">
            {qr.response}
          </ReactMarkdown>
        </Spoiler>
      ))}
    </section>
  )
}

export default StartupShowcaseQuestionaire
