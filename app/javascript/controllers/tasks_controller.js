import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["task"]

  connect() {
    this.index = this.taskTargets.length
  }

  addTask(event) {
  	console.log(this)
    event.preventDefault()
    let content = this.taskTemplate()
    document.querySelector("#tasks-list").insertAdjacentHTML("beforeend", content)
    this.index++
  }

  removeTask(event) {
    event.preventDefault()
    let item = event.target.closest(".nested-fields")
    if (item) {
      item.querySelector("input[name*='_destroy']").value = "1"
      item.style.display = "none"
    }
  }

  taskTemplate() {
    const template = document.querySelector("#task_template")
    return template.innerHTML.replace(/NEW_RECORD/g, this.index)
  }
}
