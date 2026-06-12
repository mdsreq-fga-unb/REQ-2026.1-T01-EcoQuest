import 'typed-htmx'

declare global {
  namespace JSX {
    interface HTMLAttributes extends HtmxAttributes {}
  }
}
