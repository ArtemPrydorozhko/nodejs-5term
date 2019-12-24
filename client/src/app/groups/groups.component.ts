import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../shared/services/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  public newGroup: FormGroup;
  public userGroups;
  public groups;
  constructor(private serverService: ServerService,
              private router: Router) { }

  ngOnInit() {
    this.newGroup = new FormGroup({
      'mediaUrl': new FormControl(),
      'name': new FormControl(null, Validators.required)
    });

    this.serverService.getGroups().subscribe((groups) => {
      console.log(groups);
      
      this.groups = groups;
    });

    this.serverService.getUserGroups().subscribe((userGroups) => {
      console.log(userGroups);
      
      this.userGroups = userGroups;
    });
  }

  public onCreateGroup() {
    this.serverService.createGroup({
      name: this.newGroup.value.name,
      mediaUrl: this.newGroup.value.mediaUrl
    }).subscribe((result) => {
      console.log(result);

    });
  }

  public onUserGroupSelected(groupId: number) {
    this.router.navigate([`groups/${groupId}`]);
  }

  public onGroupSelected(groupId: number) {
    this.router.navigate([`groups/${groupId}`]);
  }
}
