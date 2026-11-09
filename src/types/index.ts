import * as MDI from '@mdi/js'

// `icon` is a Material Design Icons path; `mask` is an SVG in /public for brands MDI dropped
export type Link = { 
    label: string; 
    href: string 
    icon: typeof MDI.mdiApple | typeof MDI.mdiGithub | typeof MDI.mdiGooglePlay | typeof MDI.mdiShieldAccount | typeof MDI.mdiChat | typeof MDI.mdiPost
}
