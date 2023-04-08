const Filter = ({filterValue, changeFilterValue}) => (
  <table>
    <tbody>
      <tr>
        <td>Search</td>
        <td>
          <input 
            type="text" 
            value={filterValue} 
            onChange={changeFilterValue}
            placeholder="by Name or Number"
            required
          />
        </td>
      </tr>
    </tbody>
  </table>
);

export default Filter;
