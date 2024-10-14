# Transactional

This is usually where you store transactional-related code of your application to organize and simplify things.
This also allows for using the email templates you make anywhere on your codebase by just installing with
the monorepo setup.

This also uses the [react.email](https://react.email/) CLI for previewing and compiling the email templates
into HTML ones.

Using the CLI you can also preview your emails, see how they are going to look and try sending them
to yourself for testing purposes.

## Sharing emails with all application

For share template with all aplications, we created a `TEMPLATES` variables. So, when create a new template, is necessary to add this template on `TEMPLATES` variable. 

You can see more in the example below: 

```
export const TEMPLATES = [
  {
    label: 'Create Workout Review',
    value: 'create-workout-review',
    component: CreateWorkoutReview
  }
]
```

Properties:
`label`: This property define how the template is showed on admin application.
`value`: This property should be a unique value for each template. It's used by the admin application to control each template is selected, and by the API Application to use the correct template when send e-mail.
`component`: This property defined how componente should be used for this value.

### Previewing email templates

First, install the dependencies:

```sh
yarn
```

Then, you can run the react.email developmenet server by running:

```sh
yarn dev
```

Open [localhost:3405](http://localhost:3405) with your browser to see the result.

---

See the [react.email docs](https://react.email/docs/introduction) for more details.

## License

MIT License