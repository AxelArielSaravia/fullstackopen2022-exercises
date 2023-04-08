
const Header = ({text}) => <h2>{text}</h2>

const Part = ({name, exercises}) => (<p>{name} {exercises}</p>)

const Content = ({parts}) => parts.map(el => (
  <Part key={el.id} name={el.name} exercises={el.exercises}/>)
);

const Total = ({parts}) => {
  const value = parts.reduce((prev, curr) => prev + curr.exercises, 0);
  return <p><strong>Total of {value} exercises</strong></p>
}

const Course = ({course}) => {
  return (
    <>
      <Header text={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  );
} 

export default Course;