export function Component() {
  const navigate = useNavigate()

  return (
    <div>
      <div onClick={() => navigate('/code-templates/table-templates')}>code-templates</div>
      <div onClick={() => navigate('/code-templates/card-templates')}>card-templates</div>
    </div>
  )
}
