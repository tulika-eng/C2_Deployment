import React, { useState } from 'react';
import './PostPage.css'

function PostPage() {
  const [postType, setPostType] = useState('question')
  const [questionData, setQuestionData] = useState({ title: '', description: '', tags: '' })
  const [articleData, setArticleData] = useState({ title: '', abstract: '', articleText: '', tags: '' })
  const [errors, setErrors] = useState({})
  const [popup, setPopup] = useState({ show: false, type: '', title: '', message: '' })

  const handleQuestionChange = (e) => {
    setQuestionData((current) => ({ ...current, [e.target.name]: e.target.value }))
  }

  const handleArticleChange = (e) => {
    setArticleData((current) => ({ ...current, [e.target.name]: e.target.value }))
  }

  const countTags = (tags) => tags.split(',').filter((tag) => tag.trim() !== '').length
  const closePopup = () => setPopup((current) => ({ ...current, show: false }))

  const changePostType = (type) => {
    setPostType(type)
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (postType === 'question') {
      if (!questionData.title.trim()) newErrors.title = 'Title is required for your question.'
      if (!questionData.description.trim()) newErrors.description = 'Please describe your problem.'
      if (!questionData.tags.trim()) newErrors.tags = 'At least 1 tag is required.'
      else if (countTags(questionData.tags) > 3) newErrors.tags = 'Please enter no more than 3 tags.'
    } else {
      if (!articleData.title.trim()) newErrors.title = 'Title is required for your post.'
      if (!articleData.abstract.trim()) newErrors.abstract = 'Please provide a short summary.'
      if (!articleData.articleText.trim()) newErrors.articleText = 'Post content cannot be empty.'
      if (!articleData.tags.trim()) newErrors.tags = 'At least 1 tag is required.'
      else if (countTags(articleData.tags) > 3) newErrors.tags = 'Please enter no more than 3 tags.'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length) {
      setPopup({ show: true, type: 'error', title: 'Please check your post', message: Object.values(newErrors).join('\n') })
      return
    }

    setPopup({
      show: true,
      type: 'success',
      title: 'Post submitted successfully',
      message: 'Your post has been submitted. (Feature simulation)',
    })

    if (postType === 'question') setQuestionData({ title: '', description: '', tags: '' })
    else setArticleData({ title: '', abstract: '', articleText: '', tags: '' })
    setErrors({})
  }

  const isQuestion = postType === 'question'

  return (
    <main className="post-page-wrapper">
      <section className="post-card" aria-labelledby="new-post-heading">
        <div className="post-card-heading">
          <span className="post-eyebrow">DEV@Deakin Community</span>
          <h1 id="new-post-heading" className="new-post-title">Create a post</h1>
          <p className="post-intro">Share an idea, ask the community, or publish an article.</p>
        </div>

        <form className="post-form" onSubmit={handleSubmit} noValidate>
          <fieldset className="post-type-fieldset">
            <legend>Select post type</legend>
            <div className="post-type-selector">
              <label className={`post-type-radio-label ${postType === 'general' ? 'is-selected' : ''}`}>
                <input type="radio" name="postType" value="general" checked={postType === 'general'} onChange={() => changePostType('general')} />
                <span className="radio-label-copy"><strong>General</strong><small>Share an update</small></span>
              </label>
              <label className={`post-type-radio-label ${postType === 'question' ? 'is-selected' : ''}`}>
                <input type="radio" name="postType" value="question" checked={isQuestion} onChange={() => changePostType('question')} />
                <span className="radio-label-copy"><strong>Question</strong><small>Get help from others</small></span>
              </label>
              <label className={`post-type-radio-label ${postType === 'article' ? 'is-selected' : ''}`}>
                <input type="radio" name="postType" value="article" checked={postType === 'article'} onChange={() => changePostType('article')} />
                <span className="radio-label-copy"><strong>Article</strong><small>Share something in-depth</small></span>
              </label>
            </div>
          </fieldset>

          <div className="post-section-heading">
            <h2>{isQuestion ? 'What do you need help with?' : postType === 'general' ? 'What would you like to share?' : 'Write an article'}</h2>
            <p>{isQuestion ? 'Give your question a clear title and explain the problem so the community can help.' : postType === 'general' ? 'Add a title, summary, and content to share your update with the community.' : 'Give your article a clear title, summary, and detailed content.'}</p>
          </div>

          {isQuestion ? (
            <div className="post-fields">
              <div className="post-form-row">
                <label htmlFor="q-title">Title <span className="required-mark">*</span></label>
                <input className="post-input" id="q-title" name="title" value={questionData.title} onChange={handleQuestionChange} placeholder="e.g. How do I connect React to Firebase?" aria-invalid={Boolean(errors.title)} />
                {errors.title && <p className="post-error-msg">{errors.title}</p>}
              </div>
              <div className="post-form-row">
                <label htmlFor="q-desc">Describe your problem <span className="required-mark">*</span></label>
                <textarea className="post-textarea" id="q-desc" name="description" rows={7} value={questionData.description} onChange={handleQuestionChange} placeholder="Include what you tried and any error messages..." aria-invalid={Boolean(errors.description)} />
                {errors.description && <p className="post-error-msg">{errors.description}</p>}
              </div>
              <div className="post-form-row">
                <label htmlFor="q-tags">Tags <span className="required-mark">*</span></label>
                <input className="post-input" id="q-tags" name="tags" value={questionData.tags} onChange={handleQuestionChange} placeholder="react, javascript, firebase" aria-invalid={Boolean(errors.tags)} />
                <span className="post-field-hint">Add up to 3 tags, separated by commas.</span>
                {errors.tags && <p className="post-error-msg">{errors.tags}</p>}
              </div>
            </div>
          ) : (
            <div className="post-fields">
              <div className="post-form-row">
                <label htmlFor="a-title">Title <span className="required-mark">*</span></label>
                <input className="post-input" id="a-title" name="title" value={articleData.title} onChange={handleArticleChange} placeholder="Give your post a descriptive title" aria-invalid={Boolean(errors.title)} />
                {errors.title && <p className="post-error-msg">{errors.title}</p>}
              </div>
              <div className="post-form-row">
                <label htmlFor="a-abstract">Summary <span className="required-mark">*</span></label>
                <textarea className="post-textarea" id="a-abstract" name="abstract" rows={3} value={articleData.abstract} onChange={handleArticleChange} placeholder="Summarise the main point in a few sentences..." aria-invalid={Boolean(errors.abstract)} />
                {errors.abstract && <p className="post-error-msg">{errors.abstract}</p>}
              </div>
              <div className="post-form-row">
                <label htmlFor="a-text">{postType === 'general' ? 'Post content' : 'Article content'} <span className="required-mark">*</span></label>
                <textarea className="post-textarea" id="a-text" name="articleText" rows={8} value={articleData.articleText} onChange={handleArticleChange} placeholder="Write your content here..." aria-invalid={Boolean(errors.articleText)} />
                {errors.articleText && <p className="post-error-msg">{errors.articleText}</p>}
              </div>
              <div className="post-form-row">
                <label htmlFor="a-tags">Tags <span className="required-mark">*</span></label>
                <input className="post-input" id="a-tags" name="tags" value={articleData.tags} onChange={handleArticleChange} placeholder="react, student-life, tutorial" aria-invalid={Boolean(errors.tags)} />
                <span className="post-field-hint">Add up to 3 tags, separated by commas.</span>
                {errors.tags && <p className="post-error-msg">{errors.tags}</p>}
              </div>
            </div>
          )}

          <div className="post-action-bar">
            <span className="post-required-note"><span className="required-mark">*</span> Required fields</span>
            <button className="post-btn" type="submit">Publish post <span aria-hidden="true">→</span></button>
          </div>
        </form>
      </section>

      {popup.show && (
        <div className="simple-modal-backdrop" role="presentation" onClick={closePopup}>
          <div className="simple-modal-card" role="dialog" aria-modal="true" aria-labelledby="post-modal-title" onClick={(e) => e.stopPropagation()}>
            <button className="simple-modal-close" type="button" onClick={closePopup} aria-label="Close dialog">×</button>
            <div className={`modal-status-icon ${popup.type}`} aria-hidden="true">{popup.type === 'success' ? '✓' : '!'}</div>
            <h3 id="post-modal-title" className={`simple-modal-title ${popup.type}`}>{popup.title}</h3>
            <p className="simple-modal-text">{popup.message}</p>
            <div className="simple-modal-actions"><button className="simple-modal-btn" type="button" onClick={closePopup}>Got it</button></div>
          </div>
        </div>
      )}
    </main>
  )
}

export default PostPage
