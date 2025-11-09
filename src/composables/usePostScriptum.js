export async function usePostScriptum() {
    const lines = [
        "На самом деле, надо было какой-нибудь primevue использовать с его замечательной валидацией из коробки",
        "и не мучаться с ручной валидацией на reactive + watch",
        "а просто <Form :validation-schema=\"schema\"> и всё",
        "и DataTable, и Toast, и ConfirmDialog в комплекте",
        "я правда не понимаю почему я сразу так не сделал"
    ]

    for (const [i, line] of lines.entries()) {
        await new Promise(r => setTimeout(r, 2000))
        console.log(`%c${line}`, 'color: #666')
    }
}