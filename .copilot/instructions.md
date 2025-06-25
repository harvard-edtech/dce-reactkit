# Instructions for Copilot

Use the following instructions to complete the code:

- Use single quotes for all strings, except when using template literals. Use double quotes only in JSX code for string attributes.
- Use `const` for variables that are not reassigned.
- Use `let` only when you need to reassign a variable.
- Use `===` for equality checks.
- Use `!==` for inequality checks.
- Generously document blocks of code with comments, capitalize the first letter of comments, and use full sentences.
- Use `//` for single-line comments and `/* ... */` for multi-line comments
- Use `{/* ... */}` for comments in JSX code.
- Never use `function` keyword; use arrow functions instead.
- All functions should be defined using arrow function syntax and should use parentheses for parameters, even if there is only one parameter and curly braces for the function body, even if it's a single line function.
- Use `export default` for the main export of a module.
- If a function has more than two arguments, switch to using a single `opts` object argument for parameters.
- Use `import` statements that use single quotes for module paths.