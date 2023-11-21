interface Props {
  operate?: React.ReactNode
  table?: React.ReactNode
}

export default function TableLayout(props: Props) {
  return (
    <ACard
      hoverable
      className="cursor-default"
    >
      {props.operate ? <ACard className="!mb-2">{props.operate}</ACard> : null}
      {props.table}
    </ACard>
  )
}
