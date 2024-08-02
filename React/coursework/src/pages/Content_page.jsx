import Menu from '/src/components/Menu'
import Content from '/src/components/Content'
 /**
 * Content
 * 
 * xxxxxxxx
 * 
 * @author Karol Fryc W21030911
 */
function Content_page() {
  const title = <h1>Content</h1>
  return (
    <>
      <Menu />
      {title}
      <Content />
    </>
  )
}
 
export default Content_page