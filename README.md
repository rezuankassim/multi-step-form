# Frontend Mentor - Multi-step form solution

This is a solution to the
[Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ).
Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Screenshot

![](./screenshot-desktop.jpg) ![](./screenshot-mobile.png)

### Links

- Live Site URL: [Frontend Mentor | Multi-step form](https://multi-step-form-five-rho.vercel.app/)

## My process

### Built with

- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Components
- [Formik](https://formik.org/) - Forms

### What I learned

Learned how to inject props to children and use it in the children component

```tsx
// in parent.tsx
{
  React.isValidElement<WizardStepProps>(step)
    ? React.cloneElement<WizardStepProps>(step, {
        formik: formik,
        changeStep: changeStep,
      })
    : step;
}
```

This enabled me to inject the props eg. formik, changeStep from the parent component and use it in
the children

```tsx
// in children.tsx
{
  isFunction(children)
    ? (
        children as (props: {
          formik: FormikProps<Record<string, any>>;
          changeStep: (step: number, values: FormikValues) => void;
        }) => React.ReactNode
      )({
        formik: formik as FormikProps<Record<string, any>>,
        changeStep: changeStep as (step: number, values: FormikValues) => void,
      })
    : children;
}
```

```tsx
// in page.tsx
<Children>
  {({formik, changeStep}) => <button onClick={changeStep}>{formik.values.name}</button>}
</Children>
```

### Continued development

Would like to reduce duplications of codes by creating components or abstracting codes. Try to not
rely on Tailwind arbitary values a lot, as it is very hard to maintain the styling, will try to use
the Tailwind config file for more repetitive styling.

## Author

- Website - [Rezuan Kassim](https://www.rezuankassim.com)
- Frontend Mentor - [@rezuankassim](https://www.frontendmentor.io/profile/rezuankassim)
