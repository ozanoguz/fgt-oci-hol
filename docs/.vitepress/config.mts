import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'FortiGate OCI HOL',
  description: 'Deploy FortiGate Active/Passive HA Cluster on Oracle Cloud Infrastructure',

  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#2e7cf6' }]
  ],

  themeConfig: {
    siteTitle: 'FortiGate OCI HOL',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Lab Guide', link: '/introduction' },
      { text: 'GitHub', link: 'https://github.com/ozanoguz/fgt-oci-hol' }
    ],

    sidebar: [
      {
        text: 'FortiGate OCI HOL',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Section 1: Log in to OCI', link: '/section-1-oci-login' },
          { text: 'Section 2: Deploy FortiGate Cluster', link: '/section-2-deploy-fgt-cluster' },
          { text: 'Section 3: Deploy Spoke VMs', link: '/section-3-deploy-spoke-vms' },
          { text: 'Section 4: OCI Advanced Routing', link: '/section-4-oci-advanced-routing' },
          { text: 'Section 5: FortiGate Routing and Policy', link: '/section-5-fgt-routing-policy' },
          { text: 'Section 6: Testing', link: '/section-6-testing' },
          { text: 'Section 7: Destroy the Lab', link: '/section-7-destroy-lab' },
          { text: 'References', link: '/references' }
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ozanoguz/fgt-oci-hol' }
    ],

    footer: {
      message: 'FortiGate OCI Hands-on Lab Guide',
      copyright: 'Copyright © 2026'
    }
  }
})