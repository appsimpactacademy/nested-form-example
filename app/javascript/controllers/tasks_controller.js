import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["task", "taskTypeSelect"]

  connect() {
    this.index = this.taskTargets.length
    this.updateDisabledOptions()
  }

  addTask(event) {
    event.preventDefault()
    let content = this.taskTemplate()
    document.querySelector("#tasks-list").insertAdjacentHTML("beforeend", content)
    this.index++
    this.updateDisabledOptions()
  }

  removeTask(event) {
    event.preventDefault()
    let item = event.target.closest(".nested-fields")
    if (item) {
      item.querySelector("input[name*='_destroy']").value = "1"
      item.style.display = "none"
      this.updateDisabledOptions()
    }
  }

  taskTemplate() {
    const template = document.querySelector("#task_template")
    return template.innerHTML.replace(/NEW_RECORD/g, this.index)
  }

  updateDisabledOptions() {
    const selectedValues = new Set(
      Array.from(this.taskTypeSelectTargets)
        .filter(select => select.closest(".nested-fields").style.display !== "none")
        .map(select => select.value)
        .filter(value => value !== "")
    )

    this.taskTypeSelectTargets.forEach(select => {
      Array.from(select.options).forEach(option => {
        if (selectedValues.has(option.value) && option.value !== select.value) {
          option.disabled = true
        } else {
          option.disabled = false
        }
      })
    })
  }

  taskTypeSelectTargetConnected(select) {
    select.addEventListener("change", this.updateDisabledOptions.bind(this))
  }
}
