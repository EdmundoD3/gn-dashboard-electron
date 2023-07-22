export default function NormalButton({name='normalButton',className='', params= {onClick:()=>{console.log('add function')}}}) {
  return <><button className={`normal_button ${className}`} {...params}>{name}</button></>
}