'use client';

const services = [
  'Digital Printing',
  'Digital Special Effects Printing',
  'Commercial Printing',
  'Commercial Packaging',
  'Promotional Gift Printing',
  'Large Format Printing',
  'Post Press Work',
  'Rigid Box Manufacturing',
  'Binding',
];

export default function ContactForm() {
  return (
    <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
      <div className="contact-form__row">
        <div className="field">
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>

      <div className="field">
        <label htmlFor="contact-service">Service required</label>
        <select id="contact-service" name="service" defaultValue="" required>
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="contact-details">Project details</label>
        <textarea id="contact-details" name="details" rows={4} required />
      </div>

      <button className="btn btn--light" type="submit">
        Request a Quote <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
