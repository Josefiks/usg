function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const config = {
  apiKey: "AIzaSyDPy7t3kIojylQ1P_XGYghehM2eoZRiIFg",
  authDomain: "usgtg-9a992.firebaseapp.com",
  databaseURL: "https://usgtg-9a992-default-rtdb.firebaseio.com",
  projectId: "usgtg-9a992",
  storageBucket: "usgtg-9a992.appspot.com",
  messagingSenderId: "454066556329"
};

firebase.initializeApp(config);

const App = () =>
  /*#__PURE__*/
  React.createElement(
    "div",
    { className: "comments" } /*#__PURE__*/,
    React.createElement(CommentList, null) /*#__PURE__*/,
    React.createElement(CommentForm, null) /*#__PURE__*/
  );

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      comment: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  formatTime() {
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    };

    let now = new Date().toLocaleString("en-US", options);
    return now;
  }

  escapeHTML(html) {
    // [1]
    const div = document.createElement("div");
    div.textContent = html;
    return div.innerHTML;
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.escapeHTML(this.state.username),
      comment: this.escapeHTML(this.state.comment),
      time: this.formatTime()
    };

    const db = firebase.database().ref("comments");
    db.push(user);

    this.setState({
      username: "",
      comment: ""
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return /*#__PURE__*/ React.createElement(
      "div",
      { className: "comments-form" } /*#__PURE__*/,
      React.createElement(
        "form",
        { onSubmit: this.handleSubmit } /*#__PURE__*/,
        React.createElement(
          "div",
          { className: "comment-forms" } /*#__PURE__*/,
          React.createElement("input", {
            name: "username",
            type: "text",
            className: "username",
            placeholder: "Your name",
            value: this.state.username,
            onChange: this.handleChange,
            required: true
          }) /*#__PURE__*/,

          React.createElement("input", {
            name: "comment",
            className: "comment",
            placeholder: "Comment",
            value: this.state.comment,
            onChange: this.handleChange,
            required: true
          }) /*#__PURE__*/,

          React.createElement("input", {
            type: "submit",
            value: "Send"
          })
        )
      )
    );
  }
}

class CommentList extends React.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "state", { comments: [] });
  }
  componentWillMount() {
    // [2]
    const db = firebase.database().ref("comments");
    const MAX_COUNT = 9;
    db.on("value", (snapshot) => {
      if (snapshot.numChildren() > MAX_COUNT) {
        let childCount = 0;
        let updates = {};
        snapshot.forEach((child) => {
          if (++childCount < snapshot.numChildren() - MAX_COUNT) {
            updates[child.key] = null;
          }
        });
        db.update(updates);
      }
    });
  }
  componentDidMount() {
    const db = firebase.database().ref("comments");

    db.on("value", (snapshot) => {
      const comments = snapshot.val();
      const arr = [];
      for (const comment in comments) {
        arr.push({
          username: comments[comment].username,
          comment: comments[comment].comment,
          time: comments[comment].time
        });
      }

      this.setState({
        comments: arr.reverse()
      });
    });
  }
  render() {
    return /*#__PURE__*/ React.createElement(
      "div",
      { className: "comments-list" },
      this.state.comments.map((comment /*#__PURE__*/) =>
        React.createElement(Comment, {
          username: comment.username,
          comment: comment.comment,
          time: comment.time
        })
      )
    );
  }
}

const Comment = ({ username, comment, time } /*#__PURE__*/) =>
  React.createElement(
    "div",
    { className: "comment" } /*#__PURE__*/,
    React.createElement("div", { className: "username" }, username, ": "),
    React.createElement("div", { className: "message" }, comment) /*#__PURE__*/
  );

const mountNode = document.getElementById("comments");
ReactDOM.render(/*#__PURE__*/ React.createElement(App, null), mountNode);

/*
[1] Thank you to Andreas Borgen for this bit:
    https://codepen.io/Sphinxxxx/pen/wjzRKO?editors=0010
[2] Thank you SO:
    https://stackoverflow.com/questions/33887696/how-
    to-delete-all-but-most-recent-x-children-in-a-
    firebase-node
*/
