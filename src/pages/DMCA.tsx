import { LegalPage, type LegalSection, AFFILIATION_NOTICE } from '@/components/layout/LegalPage'

const sections: LegalSection[] = [
    {
        id: 'what-flow-is',
        title: 'What Flow is',
        content: (
            <p>Flow is a free, open-source app, licensed under GPL-3.0, that plays YouTube's public catalog. It doesn't host, upload, store or redistribute any videos or music. Everything you watch or hear in Flow is streamed directly from YouTube.</p>
        ),
    },
    {
        id: 'content-on-youtube',
        title: 'Content on YouTube',
        content: (
            <>
                <p>If a video or song infringes your copyright, the place to act is YouTube, which hosts it. Use <a href="https://support.google.com/youtube/answer/2807622" target="_blank" rel="noopener noreferrer">YouTube's copyright removal process</a>.</p>
                <p>Once YouTube removes something, it's gone from Flow too. Removing Flow from app stores wouldn't take the content down.</p>
            </>
        ),
    },
    {
        id: 'this-website',
        title: 'This website',
        content: (
            <p>The screenshots on this site show the app in use, so they include video thumbnails, channel art and album covers that belong to others, shown incidentally. If one of them includes your work and you'd like it replaced, tell us and we'll swap the screenshot.</p>
        ),
    },
    {
        id: 'source-code',
        title: 'Flow\'s source code',
        content: (
            <p>Flow's code is public on <a href="https://github.com/A-EDev/Flow" target="_blank" rel="noopener noreferrer">GitHub</a> under GPL-3.0. If you believe any part of it infringes your rights, open an issue there and we'll look into it.</p>
        ),
    },
    {
        id: 'trademarks',
        title: 'Trademarks',
        content: (
            <p>{AFFILIATION_NOTICE} Other product names mentioned on this site belong to their owners.</p>
        ),
    },
    {
        id: 'contact',
        title: 'Contact',
        content: (
            <p>Open an issue on <a href="https://github.com/A-EDev/Flow/issues" target="_blank" rel="noopener noreferrer">GitHub</a>, or post on <a href="https://reddit.com/r/flow_official" target="_blank" rel="noopener noreferrer">r/Flow_Official</a>. For anything you'd rather not post publicly, <a href="https://www.reddit.com/message/compose?to=/r/flow_official" target="_blank" rel="noopener noreferrer">message the subreddit's moderators</a>.</p>
        ),
    },
]

export function DMCA() {
    return (
        <LegalPage
            kicker="Copyright & DMCA"
            title="Nothing hosted,"
            accent="nothing to take down."
            updated="27 September 2026"
            intro={<p>Flow is a client app. It plays videos that live on YouTube and doesn't store any of them. Here's where to go if you believe something infringes your copyright.</p>}
            sections={sections}
        />
    )
}

export default DMCA
