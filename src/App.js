import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FilterSearchItems from './Questions/FilterSearchItems';
import UseDebounceSearch from './Questions/UseDebounceSearch';
import PhoneNumberInput from './Questions/PhoneNumberInput';
import DoubleDropdown from './Questions/DoubleDropDown';
import Checkbox from './Questions/Checkbox';
import ArrayManipulation from './Questions/ArrayManipulation';
import Basic from './Questions/Basic';
import ErrorMessage from './Questions/ErrorMessage';

// 題目集中管理 (未來擴展只需修改這裡)
const questionRoutes = [
  { path: '/basic', component: Basic, name: 'Basic' },
  { path: '/first', component: FilterSearchItems, name: 'Filter Search' },
  { path: '/second', component: UseDebounceSearch, name: 'Debounce Search' },
  { path: '/third', component: PhoneNumberInput, name: 'Phone Input' },
  { path: '/double', component: DoubleDropdown, name: 'Double Dropdown' },
  { path: '/checkbox', component: Checkbox, name: 'Checkbox' },
  {
    path: '/arrayjs',
    component: ArrayManipulation,
    name: 'Array Manipulation',
  },
  { path: '/oop', component: ErrorMessage, name: 'OOP' },
];

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        {/* 2. 動態生成導航連結 */}
        <nav>
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              gap: '20px',
            }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            {questionRoutes.map(({ path, name }) => (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <hr style={{ margin: '20px 0' }} />

        {/* 3. 動態生成路由 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {questionRoutes.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

// 首頁組件獨立出來
function HomePage() {
  return (
    <div>
      <h2>React Practice Questions</h2>
      <p>Select a question from the navigation bar</p>
      {/* 可以加統計資訊，例如： */}
      <small>Total questions: {questionRoutes.length}</small>
    </div>
  );
}

export default App;
