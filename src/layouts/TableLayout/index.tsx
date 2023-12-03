interface Props {
  operate?: React.ReactNode
  table?: React.ReactNode
}

export default function TableLayout(props: Props) {
  return (
    <ACard
      hoverable
      rootClassName="!cursor-default"
    >
      {props.operate ? <ACard rootClassName="!mb-2">{props.operate}</ACard> : null}
      <div>{props.table}</div>
    </ACard>
  )
}
