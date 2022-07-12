import "./App.css";
// React 에서 제공하는 기본 함수 hook
import {useState} from 'react';

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}
function Header(props) {
  // Component -> 사용자 정의 태그 -> 무조건 대문자로 시작해야함
  console.log("props", props, props.title);
  return (<header>
      {/* 중괄호를 쓰면 표현식으로 사용됨 */}
      <h1>
        <a href="/" onClick={(event)=>{
          event.preventDefault();
          props.onChangeMode();
        }}>{props.title}</a>
      </h1>
    </header>
  );
}

function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        // a태그를 눌렀을때 디폴트값인 새로고침이 안되게끔 예방하는 코드
        props.onChangeMode(Number(event.target.id));
        // target-> event를 유발시킨 테그 -> 여기에서는 a tag를 말한다
      }}>{t.title}</a>
      </li>)
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type='text' name="title" placeholder="title"></input></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type='submit' value='Create'></input></p>
    </form>
  </article>
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);  
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type='text' name="title" placeholder="title" value={title} onChange={event=>{
        // 값이 변할 때 마다 onChange가 실행됨. 그 때 마다 title을 바꿔줌
        setTitle(event.target.value);
      }}></input></p>
      <p><textarea name="body" placeholder="body" value={body} onChange={event=>{
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type='submit' value='Update'></input></p>
    </form>
  </article>
}

function App() {
  // 배열 return, 0번째는 상태의 값을 읽을 때 쓰는 데이터, 1번째는 상태의 값을 변경할 때 사용하는 함수
  // 'WELCOME'은 state값의 초기값 (0번째 인덱스)
  // setMode를 통해 mode를 바꿀 수 있음 (1번째 인덱스 함수로 바꿀 수 있음)
  // const _mode = useState('WELCOME');
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState('WELCOME');
  const [id, setID] = useState(null);
  // const는 뒤에서 변수가 바뀌지 않을 때, 더 튼튼해짐
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javescript', body:'javascript is ...'}
  ]);
  let content = null;
  let contextControl = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ') {
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <>
    <li><a href={"/update"+id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
      }}>Update</a></li>
    <li><input type='button' value='Delete' onClick={()=>{
      const newTopics = []
      for(let i=0; i<topics.length; i++){
        if(topics[i].id !== id){
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
      setMode('WELCOME');
    }}></input></li>
    </>
  } else if(mode === 'CREATE') {
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body};
      // 복제본이 만들어짐
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setID(nextId);
      setNextId(nextId+1);
    }}></Create>
  } else if(mode === 'UPDATE'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      const newTopics = [...topics]
      const updatedTopic = {id:id, title:title, body:body}
      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ')
    }}></Update>
  }

  return (
    <div>
      <Header title="REACT" onChangeMode={()=>{
        // setMode를 하면 App 함수가 다시 실행된다.
        // mode == 'WELCOME'; 이렇게 하면 함수가 다시 실행 안되어서 반응하지 않음
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setID(_id)
      }}></Nav>
      {content}
      <ul>
        <li><a href="/create" onClick={event=>{
         event.preventDefault();
         setMode('CREATE');
         }}>Create</a></li>
         {contextControl}
      </ul>
    </div>
  );
}

export default App;
