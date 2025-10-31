# 🎨 UI Guide - Visual Overview

## Color Scheme

### Primary Colors
- **Purple Gradient**: `#667eea` → `#764ba2` (Primary brand color)
- **Success Green**: `#10b981` (Completed projects)
- **Warning Yellow**: `#f59e0b` (Processing projects)
- **Error Red**: `#ef4444` (Failed projects)
- **Secondary Gray**: `#6b7280` (Pending projects)

### Background
- **Light Mode**: Gradient from `slate-50` to `slate-100`
- **Dark Mode**: Gradient from `slate-900` to `slate-800`

## Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  Header (Sticky)                                        │
│  ┌──────┐  TDS App Builder                             │
│  │ Icon │  AI-Powered Application Generator            │
│  └──────┘                                    ● Connected│
└─────────────────────────────────────────────────────────┘
┌──────────┬──────────────────────────────────────────────┐
│          │                                              │
│ Sidebar  │  Main Content Area                          │
│          │                                              │
│ ● Dash   │  [Page Content Here]                        │
│ ○ Build  │                                              │
│ ○ Proj   │                                              │
│          │                                              │
│          │                                              │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

## Page Layouts

### 1. Dashboard Page

```
┌─────────────────────────────────────────────────────────┐
│ Dashboard                                               │
│ Overview of your AI-generated applications             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│ │ 🚀 Total │ │ ✓ Done   │ │ ⟳ Active │ │ ✗ Failed │  │
│ │    42    │ │    38    │ │     3    │ │     1    │  │
│ │          │ │  90% ↗   │ │          │ │          │  │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ Quick Actions                                       ││
│ │ Get started with building your next app            ││
│ │                                                     ││
│ │ [🚀 Create New Project]  [View All Projects]      ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ Recent Projects                                     ││
│ │ Your latest generated applications                  ││
│ │                                                     ││
│ │ ┌─────────────────────────────────────────────────┐││
│ │ │ my-awesome-app          [completed]             │││
│ │ │ Create a landing page for...                    │││
│ │ │ 🕐 2h ago • Round 1            [View Live]      │││
│ │ └─────────────────────────────────────────────────┘││
│ │ ┌─────────────────────────────────────────────────┐││
│ │ │ portfolio-site          [processing]            │││
│ │ │ Build a portfolio with...                       │││
│ │ │ 🕐 5m ago • Round 1            ⟳ Generating...  │││
│ │ └─────────────────────────────────────────────────┘││
│ └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### 2. Builder Page

```
┌─────────────────────────────────────────────────────────┐
│ App Builder                                             │
│ Create a new AI-generated application                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ ✨ Project Configuration                            ││
│ │ Fill in the details below to generate your app      ││
│ │                                                     ││
│ │ Email                                               ││
│ │ ┌─────────────────────────────────────────────────┐││
│ │ │ your@email.com                                  │││
│ │ └─────────────────────────────────────────────────┘││
│ │                                                     ││
│ │ Secret Key                                          ││
│ │ ┌─────────────────────────────────────────────────┐││
│ │ │ ••••••••••                                      │││
│ │ └─────────────────────────────────────────────────┘││
│ │ This should match the USER_SECRET in your .env      ││
│ │                                                     ││
│ │ Task ID                                             ││
│ │ ┌─────────────────────────────────────────────────┐││
│ │ │ my-awesome-app                                  │││
│ │ └─────────────────────────────────────────────────┘││
│ │ This will be your GitHub repository name            ││
│ │                                                     ││
│ │ Project Brief                                       ││
│ │ ┌─────────────────────────────────────────────────┐││
│ │ │ Create a responsive landing page for a coffee   │││
│ │ │ shop with menu section, contact form, and       │││
│ │ │ image gallery. Use warm colors...               │││
│ │ │                                                 │││
│ │ └─────────────────────────────────────────────────┘││
│ │                                                     ││
│ │ Round                                               ││
│ │ ┌─────────────────────────────────────────────────┐││
│ │ │ Round 1 - New Project                ▼         │││
│ │ └─────────────────────────────────────────────────┘││
│ │                                                     ││
│ │ [✨ Generate Application]  [Cancel]                ││
│ └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### 3. Projects Page

```
┌─────────────────────────────────────────────────────────┐
│ Projects                          [Create New Project]  │
│ Manage all your generated applications                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ 🔍 Search projects...                               ││
│ │                                                     ││
│ │ [All] [Completed] [Processing] [Failed] [Pending]  ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│ │ coffee-shop  │ │ portfolio    │ │ blog-site    │   │
│ │ [completed]  │ │ [processing] │ │ [completed]  │   │
│ │              │ │              │ │              │   │
│ │ Landing page │ │ Personal...  │ │ Tech blog... │   │
│ │ for coffee   │ │              │ │              │   │
│ │              │ │ ⟳ Generating │ │              │   │
│ │ 🕐 2h ago    │ │ 🕐 5m ago    │ │ 🕐 1d ago    │   │
│ │ Round 1      │ │ Round 1      │ │ Round 2      │   │
│ │              │ │              │ │              │   │
│ │ [📁 Repo]    │ │              │ │ [📁 Repo]    │   │
│ │ [🔗 Live]    │ │              │ │ [🔗 Live]    │   │
│ └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                         │
│ Showing 3 of 42 projects                               │
└─────────────────────────────────────────────────────────┘
```

### 4. Project Detail Page

```
┌─────────────────────────────────────────────────────────┐
│ ← coffee-shop-landing                    [completed]    │
│ Project Details                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ ⟳ Generating code with AI...                       ││
│ │ This updates in real-time                           ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ ┌──────────────────────┐ ┌──────────────────────────┐ │
│ │ Project Information  │ │ Links                    │ │
│ │                      │ │                          │ │
│ │ # Task ID            │ │ [📁 View Repository  →] │ │
│ │ coffee-shop-landing  │ │                          │ │
│ │                      │ │ [🔗 View Live App    →] │ │
│ │ ✉ Email              │ │                          │ │
│ │ user@example.com     │ │ Commit SHA              │ │
│ │                      │ │ abc1234                 │ │
│ │ 📅 Created           │ │                          │ │
│ │ Oct 31, 2025 2:30 PM │ │                          │ │
│ │                      │ │                          │ │
│ │ 📅 Completed         │ │                          │ │
│ │ Oct 31, 2025 2:35 PM │ │                          │ │
│ │                      │ │                          │ │
│ │ Round: [1]           │ │                          │ │
│ └──────────────────────┘ └──────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ Project Brief                                       ││
│ │                                                     ││
│ │ Create a responsive landing page for a coffee shop ││
│ │ with hero section, menu, about us, and contact     ││
│ │ form. Use warm colors and coffee-themed images.    ││
│ └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

## Component Styles

### Buttons

```
Primary:    [✨ Generate Application]  (Purple gradient)
Secondary:  [Cancel]                   (Gray outline)
Outline:    [View All Projects]       (Border only)
Ghost:      [×]                        (Transparent)
```

### Status Badges

```
Completed:  [completed]   (Green)
Processing: [processing]  (Yellow/Orange)
Failed:     [failed]      (Red)
Pending:    [pending]     (Gray)
```

### Cards

```
┌─────────────────────────────────────┐
│ Card Title                          │
│ Card description text               │
├─────────────────────────────────────┤
│                                     │
│ Card content goes here              │
│                                     │
└─────────────────────────────────────┘
```

### Input Fields

```
Label
┌─────────────────────────────────────┐
│ Placeholder text...                 │
└─────────────────────────────────────┘
Helper text or validation message
```

## Responsive Breakpoints

### Desktop (1024px+)
- Sidebar visible
- 3-column project grid
- Full navigation
- Expanded cards

### Tablet (768px - 1023px)
- Sidebar hidden (hamburger menu)
- 2-column project grid
- Compact navigation
- Medium cards

### Mobile (< 768px)
- Sidebar hidden (hamburger menu)
- 1-column project grid
- Bottom navigation
- Compact cards
- Stacked forms

## Animations

### Hover Effects
- Cards: Lift with shadow
- Buttons: Slight scale + color change
- Links: Underline slide-in

### Loading States
- Spinner: Rotating circle
- Skeleton: Pulsing gray boxes
- Progress: Animated bar

### Transitions
- Page changes: Fade in
- Status updates: Color pulse
- New items: Slide in from top

## Icons

Using Lucide React icons:
- 🚀 Rocket - New projects, launch
- ✓ CheckCircle2 - Completed
- ⟳ Loader2 - Processing (animated)
- ✗ AlertCircle - Failed
- 🕐 Clock - Timestamps
- ✉ Mail - Email
- # Hash - Task ID
- 📅 Calendar - Dates
- 📁 Github - Repository
- 🔗 ExternalLink - Live site
- ✨ Sparkles - AI generation
- 🔨 Hammer - Builder
- 📊 LayoutDashboard - Dashboard
- 🔍 Search - Search

## Typography

### Headings
- H1: 3xl (30px) - Page titles
- H2: 2xl (24px) - Section titles
- H3: xl (20px) - Card titles
- H4: lg (18px) - Subsections

### Body
- Base: sm (14px) - Main text
- Small: xs (12px) - Helper text
- Tiny: 2xs (10px) - Timestamps

### Weights
- Bold: 700 - Titles
- Semibold: 600 - Emphasis
- Medium: 500 - Labels
- Normal: 400 - Body text

## Spacing

### Padding
- Page: 6-8 (24-32px)
- Card: 6 (24px)
- Button: 4 (16px)
- Input: 3 (12px)

### Gaps
- Grid: 4-6 (16-24px)
- Stack: 2-4 (8-16px)
- Inline: 2 (8px)

## Shadows

### Cards
- Default: `shadow-sm`
- Hover: `shadow-lg`
- Active: `shadow-xl`

### Modals
- Overlay: `shadow-2xl`

## Border Radius

- Cards: `rounded-lg` (8px)
- Buttons: `rounded-md` (6px)
- Inputs: `rounded-md` (6px)
- Badges: `rounded-full` (9999px)

---

**This UI is designed to be:**
- Clean and modern
- Easy to navigate
- Visually appealing
- Responsive and accessible
- Consistent throughout
