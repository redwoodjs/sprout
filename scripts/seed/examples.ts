import { Language } from '@prisma/client'
import { db } from 'api/src/lib/db'
import SeedMedia from './media'
import SeedTag from './tag'

const HighlightIndex = (tags, media) => ({
  musicApplication: {
    description:
      'Some music application, with full library, artworks, lyrics, bits of original music videos',
    isPublished: true,
    label: 'Music app',
    link: 'https://redwoodjs.com/music',
    subtitle: 'Awesome music application example',
    title: 'Music Application',
    media: { connect: { id: media.rwLogo.id } },
    localizations: {
      create: [
        {
          language: Language.fra,
          subtitle: "Super example d'application de musique",
          isValid: true,
          title: 'Application de Gestion de Musique',
          description: 'Tout un texte très en français',
        },
      ],
    },
    tags: {
      connect: [tags.highlight, tags.sample, tags.cms, tags['core-maintained']],
    },
  },
  todoApplication: {
    description: 'Some ToDo sample application powered by RedwoodJS',
    isPublished: true,
    label: 'Todo App',
    link: 'https://redwoodjs.com/todo',
    subtitle: 'Awesome todo application example',
    title: 'Todo Application',
    media: { connect: { id: media.jamstackGraph.id } },
    localizations: {
      create: [
        {
          isValid: true,
          language: Language.eng,
          description: 'Some ToDo sample application powered by RedwoodJS',
          subtitle: 'Awesome todo application example',
          title: 'Todo Application',
        },
      ],
    },
    tags: {
      connect: [
        tags.highlight,
        tags.sample,
        tags.tool,
        tags['core-maintained'],
      ],
    },
  },
  paymentApplication: {
    description:
      'Some Stripe integration, with full catalogue, checkout & payment process',
    isPublished: true,
    label: 'Stripe integration',
    link: 'https://redwoodjs.com/payment',
    subtitle: 'Awesome stripe integration example',
    title: 'Stripe integration',
    media: { connect: { id: media.randomImage.id } },
    localizations: {
      create: [
        {
          isValid: false,
          language: Language.eng,
          description:
            'Some Stripe integration, with full catalogue, checkout & payment process',
          subtitle: 'Awesome stripe integration example',
          title: 'Stripe integration',
        },
      ],
    },
    tags: {
      connect: [
        tags.highlight,
        tags.sample,
        tags.integration,
        tags['e-commerce'],
        tags['core-maintained'],
      ],
    },
  },
})

function* CanonGenerator(tags) {
  let index = 0

  while (index < 5) {
    index += 1

    yield {
      title: 'Canon Example',
      isPublished: true,
      description:
        'Generated canon example, not necessarily curated but with high value nonetheless.',
      link: `https://github.com/redwoodjs/redwood/releases/tag/v0.${
        index + 20
      }.0`,
      localizations: {
        create: [
          {
            language: Language.fra,
            title: 'Titre pour un exemple canon',
            description:
              'Example canon généré, pas nécessairement maintenu mais à forte valeur ajoutée.',
          },
        ],
      },
      tags: {
        connect: [
          tags.sample,
          tags.canon,
          index % 2 ? tags.integration : tags['e-commerce'],
        ],
      },
    }
  }
}

function* CommunityGenerator(tags) {
  let index = 0

  while (index < 20) {
    index += 1

    yield {
      label: 'Community Example',
      isPublished: true,
      description: 'Generated community example',
      link: `https://github.com/redwoodjs/redwood/releases/tag/v0.${
        index + 50
      }.0`,
      localizations: {
        create: [
          {
            language: Language.fra,
            description: 'Example communautaire généré',
          },
        ],
      },
      tags: {
        connect: [
          tags.sample,
          tags.community,
          index % 2 ? tags.tool : tags.cms,
        ],
      },
    }
  }
}

async function insertCollection(collection: any[]) {
  for (const showcase of Object.values(collection)) {
    const {
      localizations: {
        create: [Localization],
      },
      ...record
    } = showcase

    const updatedShowcase = await db.showcase.upsert({
      create: record,
      update: record,
      where: { link: record.link },
    })

    await db.showcaseLocalization.upsert({
      create: { showcaseId: updatedShowcase.id, ...Localization },
      update: { showcaseId: updatedShowcase.id, ...Localization },
      where: {
        language_showcaseId: {
          language: Localization.language,
          showcaseId: updatedShowcase.id,
        },
      },
    })
  }
}

export default async function Examples() {
  const medias = await SeedMedia()

  const tags = await SeedTag()

  await insertCollection(Object.values(HighlightIndex(tags, medias)))

  await insertCollection([...CanonGenerator(tags)])

  await insertCollection([...CommunityGenerator(tags)])
}
