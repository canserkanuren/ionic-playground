/* eslint-disable */
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * @description
 * The following TestHelper class serves as a Jasmine test helper,
 * containing common methods
 */
export class TestHelper {
  /**
   * The TestHelper constructor
   * @param  {ComponentFixture<any>} fixture For debugging and testing a component
   */
  constructor(private fixture: ComponentFixture<any>) {}

  /**
   * Get an element, filtered by a selector
   * @param  {string} selector The given CSS selector
   */
  getElement(selector: string): DebugElement {
    return this.fixture.debugElement.query(By.css(selector));
  }

  /**
   * Get an element from parent native elements parent, filtered by a selector
   * @example Popup like dialog modal it will be available only in the native element parent
   * @param  {string} selector The given CSS selector
   * @param  {number} order The given element order
   */
  getElementFromParent(selector: string, order: number = 0) {
    return this.fixture.nativeElement.parentElement.querySelectorAll(selector)[
      order
    ];
  }

  /**
   * Get all matched elements, filtered by a selector
   * @param  {string} selector The given CSS selector
   */
  getElementAll(selector: string): DebugElement[] {
    return this.fixture.debugElement.queryAll(By.css(selector));
  }

  /**
   * Gets all matched native elements, filtered by a selector
   * @param selector The given CSS selector
   */
  getNativeElementAll(selector: string) {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }

  /**
   * Count the matched elements
   * @param  {string} selector The given CSS selector
   */
  countElements(selector: string) {
    return this.fixture.debugElement.queryAll(By.css(selector)).length;
  }

  /**
   * Counts the matched native elements. Use this count for <mat-table> children
   * @param selector Given CSS selector
   */
  countNativeElements(selector: string) {
    return this.fixture.nativeElement.querySelectorAll(selector).length;
  }

  /**
   * Fire a click event on particular element
   * @param  {string} selector The given CSS selector
   * @param  {number} order The element order in the elements list,
   * by default the event fired on the first element
   */
  clickElement(selector: string, order: number = 0) {
    this.getElementAll(selector)[order].nativeElement.click();
  }

  /**
   * Fire a click event on particular native element. Use this function for <mat-table> children
   * @param selector The given CSS selector
   * @param order The element order in the elements list
   */
  clickNativeElement(selector: string, order = 0) {
    this.getNativeElementAll(selector)[order].click();
  }

  /**
   * Create a spy on the method
   * @param  {any} component An instance of
   * the current component
   * @param  {string} method The function to spy
   */
  createSpyOn(component: any, method: string): jasmine.Spy {
    return spyOn(component, method).and.callThrough();
  }

  /**
   * Check if the component was
   * created
   * @param  {Component} component An instance of
   * the current component
   */
  verifyComponent(component: any) {
    expect(component).toBeTruthy();
  }

  /**
   * Check if element exists in the fixture
   * @param  {String} selector The given CSS selector
   */
  verifyElement(selector: string) {
    expect(this.getElement(selector)).toBeTruthy();
  }

  /**
   * Check if element does not exist in the fixture
   * @param  {String} selector The given CSS selector
   */
  verifyNoElement(selector: string) {
    expect(this.getElement(selector)).toBeFalsy();
  }

  /**
   * Check element textual content
   * @param  {string} selector The given CSS selector
   * @param  {string} content The given content to check
   * @param  {number} order The element order in the elements list,
   * by default the event fired on the first element
   */
  verifyTextContent(selector: string, content: string, order: number = 0) {
    expect(
      this.getElementAll(selector)[order].nativeElement.textContent
    ).toContain(content);
  }

  /**
   * Check element placeholder textual content
   * @param  {string} selector The given CSS selector
   * @param  {string} placeholderContent The given content to check
   */
  verifyPlaceholderContent(selector: string, placeholderContent: string) {
    expect(this.getElement(selector).nativeElement.placeholder).toContain(
      placeholderContent
    );
  }

  /**
   * Check if the checkbox element was checked
   * @param  {String} selector The given CSS selector
   * @param  {number} order The given element order
   */
  verifyCheckBox(selector: string, order: number = 0) {
    expect(this.getElementAll(selector)[order].nativeElement.checked).toBe(
      true
    );
  }
  /**
   * Check if the checkbox element is in indeterminate state
   * @param {string} selector The given CSS selector
   * @param {number} order The given element order
   */
  verifyCheckBoxIndeterminate(selector: string, order: number = 0) {
    expect(
      this.getElementAll(selector)[order].nativeElement.indeterminate
    ).toBe(true);
  }
}
