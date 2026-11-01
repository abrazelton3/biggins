import { client } from './sanity';

// --- projection fragments (GROQ). Aliases keep component field names. ---
const CLIP_CARD = `{
  "id": slug.current, title, emphasis, "date": displayDate, publication, url, deck, credit, tags, note, thumbnail
}`;
const CLIP_ROW = `{
  "id": slug.current, title, "date": displayDate, publication, url, deck, tags, group, order
}`;
const PAPER_ROW = `{
  title, "date": displayDate, publisher, tags, "abstract": abstract, "fileUrl": file.asset->url
}`;
const PAPER_CARD = `{
  title, shortTitle, type, year, "date": displayDate, publisher, abstract, filesize, "fileUrl": file.asset->url
}`;
// "text" = the body as plain text; EssayCard takes its first sentence for the polaroid back
const ESSAY_CARD = `{
  "slug": slug.current, title, category, "period": displayPeriod, excerpt, image, illustrated, order,
  startHere, "text": pt::text(body)
}`;
const ESSAY_FULL = `{
  "slug": slug.current, title, emphasis, category, "period": displayPeriod, excerpt, image, illustrated, body,
  order, "words": length(string::split(pt::text(body), " "))
}`;
const FIELD_FRAME = `{ "id": _id, caption, image, orientation }`;
const SOCIAL = `{ "id": _id, label, platform, image }`;
const GALLERY = `{
  "id": _id, client, cnum, description, roles, igUrl, igHandle,
  "frames": frames[]{ title, kind, alt, image, _key }
}`;

const HERO = `{ eyebrow, headline, emphasis, lede, meta, portrait }`;
const SECTIONS = `{ writing, research, field, creative, social, about }`;
const ABOUT = `{ fieldPhoto, paragraphs, sidebar, rightNow }`;
const CONTACT = `{ heading, emphasis, headshot, pitch, email, pressKit, elsewhere, onFile }`;
const SITE = `{ name, domain, role, instagram, nav, colophon }`;

// --- queries ---
export const siteQuery = `*[_type=="site"][0]${SITE}`;
export const contactQuery = `*[_type=="contact"][0]${CONTACT}`;

// shared by the inner-page layout footer
export const footerQuery = `{ "site": *[_type=="site"][0]${SITE}, "contact": *[_type=="contact"][0]${CONTACT} }`;

export const homeQuery = `{
  "site": *[_type=="site"][0]${SITE},
  "hero": *[_type=="hero"][0]${HERO},
  "sections": *[_type=="sections"][0]${SECTIONS},
  "clips": *[_type=="clip" && defined(thumbnail)]|order(publishedAt desc)[0...6]${CLIP_CARD},
  "papers": *[_type=="paper"]|order(publishedAt desc)${PAPER_CARD},
  "essays": *[_type=="essay"]|order(order asc)[0...6]${ESSAY_CARD},
  "fieldFrames": *[_type=="fieldFrame"]|order(order asc)${FIELD_FRAME},
  "socialWork": *[_type=="socialWork"]|order(order asc)${SOCIAL},
  "about": *[_type=="about"][0]${ABOUT},
  "contact": *[_type=="contact"][0]${CONTACT}
}`;

// Writing index — all articles (grouped) + the academic papers as their own group
export const writingQuery = `{
  "clips": *[_type=="clip"]|order(order asc)${CLIP_ROW},
  "papers": *[_type=="paper"]|order(publishedAt desc)${PAPER_ROW}
}`;

export const creativeQuery = `{
  "sections": *[_type=="sections"][0]${SECTIONS},
  "essays": *[_type=="essay"]|order(order asc)${ESSAY_CARD}
}`;

export const socialQuery = `*[_type=="socialGallery"]|order(order asc)${GALLERY}`;

export const essaysAllQuery = `*[_type=="essay"]${ESSAY_FULL}`;
export const aboutQuery = `{ "sections": *[_type=="sections"][0]${SECTIONS}, "about": *[_type=="about"][0]${ABOUT} }`;

export const fetchSite = () => client.fetch(siteQuery);
export const fetchFooter = () => client.fetch(footerQuery);
export const fetchHome = () => client.fetch(homeQuery);
export const fetchWriting = () => client.fetch(writingQuery);
export const fetchCreative = () => client.fetch(creativeQuery);
export const fetchSocial = () => client.fetch(socialQuery);
export const fetchEssays = () => client.fetch(essaysAllQuery);
export const fetchAbout = () => client.fetch(aboutQuery);
export const fetchContact = () => client.fetch(contactQuery);
