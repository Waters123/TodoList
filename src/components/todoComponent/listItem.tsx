export function ListItem({ item, dispatch }: any) {
  return (
    <li className="listItem">
      <input
        className="inputToggle"
        type="checkbox"
        checked={item.complete}
        onChange={() =>
          dispatch({
            type: "COMPLETE",
            payload: { id: item.id },
          })
        }
      />
      <label>{item.title}</label>
      <span
        onClick={() => dispatch({ type: "DELETE", payload: { id: item.id } })}
      >
        X
      </span>
    </li>
  );
}
