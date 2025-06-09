# Purpose of site
- This website is made specifically to market a raffle in which there is a bottle of spirits from each county in Ireland up for prize, with 32 separate winners

# Layout

## File structure

src/
└─ assests/
    └─ product_images/
        ├─ kerry.png
└─ sections/
    ├─ header.tsx
└─ components/
    ├─ InteractiveMap.tsx

### sections

#### Header
- Main marketing visual
- Interactive map for users to see what spirit is from what country

### Components

#### Interactive map
- svg map of ireland with id for each county
- mapping from svg id to image id 
- when user hovers, the spirit from that county appears

## Technology
- Material UI
- Tailwind
- NPM

## Todo

1. prizes section with component for each spirit
2. beneficiaries component with content for each beneficiary
3. buy ticket functionality