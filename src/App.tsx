import './App.css'
import Table from "./components/table.tsx";

function App() {
  // Ideally comes from API
  const issues = [{
    id: 0,
    issueType: "Interactable Role",
    severity: "Critical",
    Component: "ABC",
    selector: ".foo > #bar",
    url: "https://www.zzzz.co.uk"
  },
    {
      id: 3,
      issueType: "Accessible Name",
      severity: "Critical",
      Component: "AAA",
      selector: ".foo#bing > #bar",
      url: "https://www.zzzz.co.uk"
    },
    {
      id: 2,
      issueType: "Interactable Role",
      severity: "Minor",
      Component: "ABC",
      selector: ".some.class",
      url: "https://www.aaa.co.uk"
    },
    {
      id: 16,
      issueType: "Keyboard Accessible",
      severity: "Critical",
      Component: "ZZZ",
      selector: "#zooooom",
      url: "https://www.zzzz.co.uk"
    },
    {
      id: 8,
      issueType: "Keyboard Accessiblee",
      severity: "Minor",
      Component: "ABC",
      selector: ".vroooomo",
      url: "https://www.fff.co.uk"
    },
    {
      id: 9,
      issueType: "Color Contrast",
      severity: "Critical",
      Component: "ABC",
      selector: "#heythere",
      url: "https://www.aaa.co.uk"
    }
  ]

  const columnNamesMap = {
    'id': 'No.',
    'issueType': 'Issue type',
    'severity': 'Severity',
    'Component': 'Component',
    'selector': 'Selector',
    'url': 'URL'
  };

  const searchableColumns = ['selector', 'url']


  // TODO: control table cell width (to not fluctuate too much depending on data...
  //    probably I should have a fixed width for table and dynamic for columns(?))
  // TODO: remove any extra styles
  // TODO: cleanup unused styles
  // TODO: check if it looks nice on light theme (but pay attention to "background: white" for table cells (comes from the presentation file))
  // TODO: remove comments
  // TODO: fix all `any` occurrences
  // "selector" cell - copy when clicking on it (as it can be too long and be partially hidden on the screen)
  return (
    <>
      <h1>Accessibility Issues List</h1>
      <Table data={issues} columnNamesMap={columnNamesMap} searchableColumns={searchableColumns} />
    </>
  )
}

export default App
