import cheerio from "cheerio"
import Input from "prompt-input"
import Password from "prompt-password"
import chalk from "chalk"
import fbLogin from "./fbLogin"
import { typing } from "./typing"
import { getFriends, getFb_dtsg } from "./getFriends"
import { setInterval } from "timers"

const timeout = ms => new Promise(res => setTimeout(res, ms))

let TypetoFriends = async (friends, fb_dtsg, cookies) => {
    for (let i = 0; i < friends.friends.data.length; i++) {
        let receiver = friends.friends.data[i].id;
        console.log(chalk.yellow.bold('[~] ') + chalk.greenBright('Typing: ') + chalk.green.bold(friends.friends.data[i].name))
        typing(receiver, fb_dtsg, cookies)
    }
    console.log(chalk.blue.bold('[...] ') + chalk.yellow.bold('Chờ đợi là hạnh phúc (20s)'))
    await timeout(20000)
    TypetoFriends(friends, fb_dtsg, cookies)
}

(async () => {
    try {

        console.log(chalk.blue.bold('Facebook Typing') + chalk.white(' by ') + chalk.green.underline.bold('GTFAF (fb.me/GTFAF)'));

        let username = await new Input({
            name: 'first',
            message: 'Nhập tài khoản của bạn'
        }).run()

        let password = await new Password({
            type: 'password',
            message: 'Nhập mật khẩu của bạn',
            name: 'password'
        }).run()

        if (typeof username == 'undefined' ||
        username.length < 5 ||
        typeof password == 'undefined' ||
        password.length < 5)
            throw chalk.bgRed.white.bold('Tài khoản hoặc mật khẩu vui lòng nhập hơn 5 ký tự')

        let login = await fbLogin(username, password)
        console.log(chalk.white.bgGreen.bold('Đăng nhập thành công!'))
        let friends = await getFriends(login.access_token)
        console.log(chalk.bgCyan.white.bold('Lấy danh sách bạn bè...'))
        let tokenType = await getFb_dtsg(login.cookies)
        let $ = cheerio.load(tokenType)
        let fb_dtsg = $('[name=fb_dtsg]').val()

        console.log(chalk.bgBlueBright.white('Bắt đầu soạn tin cho bạn bè...'))
        await TypetoFriends(friends, fb_dtsg, login.cookies)

    } catch (error) {
        console.log(error)
    }
})()