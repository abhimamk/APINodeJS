import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomTitleService } from './custom-title.service';
import { Title } from './customTitle.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-custom-title',
  templateUrl: './custom-title.component.html',
  styleUrls: ['./custom-title.component.css']
})
export class CustomTitleComponent implements OnInit {
  customTitle: Title[];
  customTitleForm: FormGroup;
  titleObj: Title;
  submitted = false;

  constructor(
    private customTitleService: CustomTitleService,
    private formBuilder: FormBuilder,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllCustomTitle();
  }

  initForm(): void {
    this.customTitleForm = this.formBuilder.group(
      {
        title: ['', Validators.compose([Validators.required])]
      }
    );
  }

  get f(): any { return this.customTitleForm.controls; }

  toasterSuccess(responseGood): any {
    this.toastr.success('', responseGood, {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing'
    });
  }

  toasterError(responseError): any {
    this.toastr.error('', responseError, {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing'
    });
  }

  getAllCustomTitle(): any {
    this.customTitleService.getAllCustomTitle().subscribe(
      (res: Title[]) => {
        this.customTitle = res.reverse();
      }
    );
  }

  // Add And Update CustomTitle

  submit(id): any {
    this.submitted = true;
    if (this.customTitleForm.invalid) {
      return;
    }
    if (!id) {
      this.addNewTitle(this.customTitleForm.value);
    } else {
      this.updateTitle(id, this.customTitleForm.value);
    }
  }

  addNewTitle(data): void {
    this.customTitleService.AddNewTitle(data).subscribe(
      (res) => {
        this.toasterSuccess(res.message);
      },
      // error
      (error) => {
        this.toasterError(error.error.message);
      },
      // Success
      () => {
        this.getAllCustomTitle();
        this.clear();
      }
    );
  }

  updateTitle(id, data): void {
    this.customTitleService.updateTitle(id, data).subscribe(
      (res) => {
        this.toasterSuccess(res.message);
      },
      // error
      (error) => {
        this.toasterError(error.error.message);
      },
      // Success
      () => {
        this.getAllCustomTitle();
        this.clear();
      }
    );
  }

  // Edit
  edit(item): void {
    this.titleObj = item;
    this.customTitleForm.patchValue(
      {
        title: item.title
      }
    );
  }

  delete(id): void {
    this.customTitleService.deleteTitle(id).subscribe(
      (res) => {
        this.toasterSuccess(res.message);
      },
      // error
      (error) => {
        this.toasterError(error.error.message);
      },
      // Success
      () => {
        this.getAllCustomTitle();
        this.clear();
      }
    );
  }

  // Search Title
  search(value: string): any {
    const data = {
      search: value
    };
    this.customTitleService.searchTitle(data).subscribe(
      (res) => {
        return this.customTitle = res.newResponse;
      }
    );
  }

  // Clear
  clear(): any {
    this.titleObj = new Title();
    this.customTitleForm.reset();
    this.submitted = false;
  }
}
