import { Category, User } from '../../models'
import { adminEmail } from '../../env'

const articleData = async (): Promise<any[]> => [
  {
    title: 'JavaScript vs. other languages',
    slug: 'javascript-vs-other-languages',
    image: 'https://www.picture.png',
    description:
      "When JavaScript first appeared, it was just an extra Turing-complete option that Netscape added to its browser. Many programmers dismissed it as a toy, a vehicle for double-checking the data in the form or adding annoying popup windows. They didn't see the promise. Few noticed the value of its forward-thinking features such as lambdas and functions as first-class objects until it brought them into the mainstream. It's now more than 20 years later and everything has changed. Web applications are the dominant way that people interact with the computing universe, and JavaScript is the foundation. Even server applications are increasingly written in JavaScript as programmers turn to Node.js for increased speed and the freedom to run the same code on the server and the client. Here's a short, bulleted list for comparing JavaScript with some of the other major programming langauges.",
    isPublic: 'true',
    author: await User.findOne({ email: adminEmail }),
    category: await Category.findOne({ title: 'Programming' })
  },
  {
    title: 'Basketball vs Football',
    slug: 'basketball-vs-football',
    image: 'https://www.picture.png',
    description:
      "When Football first appeared, it was just an extra Turing-complete option that Netscape added to its browser. Many programmers dismissed it as a toy, a vehicle for double-checking the data in the form or adding annoying popup windows. They didn't see the promise. Few noticed the value of its forward-thinking features such as lambdas and functions as first-class objects until it brought them into the mainstream. It's now more than 20 years later and everything has changed. Web applications are the dominant way that people interact with the computing universe, and JavaScript is the foundation. Even server applications are increasingly written in JavaScript as programmers turn to Node.js for increased speed and the freedom to run the same code on the server and the client. Here's a short, bulleted list for comparing JavaScript with some of the other major programming langauges.",
    isPublic: 'true',
    author: await User.findOne({ email: adminEmail }),
    category: await Category.findOne({ title: 'Sports' })
  }
]

export default articleData
