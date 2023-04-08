
const Header = ({name}) => <h1>{name}</h1>

const Part = ({name, exercises}) => (<p>{name} {exercises}</p>)

const Content = ({parts}) => parts.map(el => (
  <Part key={el.name} name={el.name} exercises={el.exercises}/>)
);

const Total = ({parts}) => {
  const value = parts.reduce((prev, curr) => prev + curr.exercises, 0);
  return <p>Number of exercises {value}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const /** !Array<number>*/  data = [];

export default App