# fx-linux-fix-apple-emoji-font

On Linux, Firefox often renders some websites (like Notion) with excessive font spacing because of the "Apple Color Emoji" font being included in the CSS font-family.

I first tried fixing this at the system level with fontconfig [see this Reddit thread](https://old.reddit.com/r/openSUSE/comments/1mgiz73/unable_to_unbind_apple_color_emoji_font_from_noto/), but couldn’t get it to work.

This project provides a Firefox userscript workaround that removes "Apple Color Emoji" from the font stack, resulting in proper text rendering.